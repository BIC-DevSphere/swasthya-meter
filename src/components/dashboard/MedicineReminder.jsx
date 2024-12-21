import React, { useState } from "react";
import { Plus, Clock, Pill, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { format, addDays, startOfToday, isSameDay, parseISO, isWithinInterval } from "date-fns";
import AddMedicineModal from "../AddMedicineModal";
import { motion, AnimatePresence } from "framer-motion";

const WeekCalendar = ({ date, isActive, onClick, completedCount, totalCount }) => {
  const formattedDate = format(date, "d");
  const dayName = format(date, "EEE");
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden ${
        isActive
          ? "ring-2 ring-blue-500 ring-offset-2"
          : "hover:ring-2 hover:ring-blue-300 hover:ring-offset-2"
      }`}
    >
      <div className={`flex h-24 w-20 min-w-[80px] flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${
        isActive
          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100"
          : "border-gray-200 bg-white"
      }`}>
        <span className="text-sm font-medium text-gray-600">{dayName}</span>
        <span className="text-2xl font-bold text-gray-800">{formattedDate}</span>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-xs font-medium text-gray-600">
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-green-500"
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const TimeButton = ({ time, completed, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
      completed
        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
        : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 hover:from-blue-200 hover:to-blue-300"
    }`}
  >
    <Clock size={16} />
    <span>{time}</span>
    {completed && <CheckCircle size={16} />}
  </motion.button>
);

const MedicineCard = ({ medicine, selectedDate, onTimeComplete }) => {
  const isDateInRange = isWithinInterval(selectedDate, {
    start: parseISO(medicine.startDate),
    end: parseISO(medicine.endDate)
  });

  if (!isDateInRange) return null;

  const times = medicine.time[0].split(", ");
  const completedTimes = medicine.completedTimes?.[format(selectedDate, "yyyy-MM-dd")] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-20 w-20 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100"
          >
            <Pill className="h-full w-full p-4 text-blue-500" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{medicine.name}</h3>
            <p className="text-sm text-gray-500">{medicine.dosage}</p>
            {medicine.notes && (
              <p className="mt-1 text-xs text-gray-400">{medicine.notes}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {times.map((time) => (
              <TimeButton
                key={time}
                time={time}
                completed={completedTimes.includes(time)}
                onClick={() => onTimeComplete(medicine._id, time)}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-gray-600">
            <CheckCircle size={16} />
            <span className="font-medium">
              {completedTimes.length}/{times.length} Taken
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MedicineReminder = () => {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [medicines, setMedicines] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const weekDates = [...Array(7)].map((_, i) => addDays(startOfToday(), i));

  const handleTimeComplete = (medicineId, time) => {
    setMedicines(prevMedicines =>
      prevMedicines.map(medicine => {
        if (medicine._id !== medicineId) return medicine;
        
        const dateKey = format(selectedDate, "yyyy-MM-dd");
        const completedTimes = medicine.completedTimes || {};
        const dayCompletedTimes = completedTimes[dateKey] || [];
        
        const updatedCompletedTimes = dayCompletedTimes.includes(time)
          ? dayCompletedTimes.filter(t => t !== time)
          : [...dayCompletedTimes, time];
        
        return {
          ...medicine,
          completedTimes: {
            ...completedTimes,
            [dateKey]: updatedCompletedTimes
          }
        };
      })
    );
  };

  React.useEffect(() => {
    const userMeds = JSON.parse(localStorage.getItem('userMeds'));
    if (userMeds) {
      setMedicines(userMeds);
    }
  }, []);



  const getDayStats = (date) => {
    let completed = 0;
    let total = 0;

    medicines.forEach(medicine => {
      const isDateInRange = isWithinInterval(date, {
        start: parseISO(medicine.startDate),
        end: parseISO(medicine.endDate)
      });

      if (isDateInRange) {
        const times = medicine.time[0].split(", ");
        total += times.length;
        
        const dateKey = format(date, "yyyy-MM-dd");
        const completedTimes = medicine.completedTimes?.[dateKey] || [];
        completed += completedTimes.length;
      }
    });

    return { completed, total };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-4xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-3xl font-bold text-blue-600"
          >
            <Pill className="text-blue-500" />
            Medicine Reminder
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
              onClick={() => setIsAddModalVisible(true)}
            >
              <Plus size={20} />
              Add Medicine
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-sm"
        >
          <section className="mb-8">
            <div className="calendar-wrapper flex justify-center gap-4 overflow-x-auto pb-4">
              {weekDates.map((date) => {
                const { completed, total } = getDayStats(date);
                return (
                  <WeekCalendar
                    key={date.toISOString()}
                    date={date}
                    isActive={isSameDay(date, selectedDate)}
                    onClick={() => setSelectedDate(date)}
                    completedCount={completed}
                    totalCount={total}
                  />
                );
              })}
            </div>
          </section>

          <section className="medicine-list space-y-6">
            <AnimatePresence>
              {medicines.map((medicine) => (
                <MedicineCard
                  key={medicine._id}
                  medicine={medicine}
                  selectedDate={selectedDate}
                  onTimeComplete={handleTimeComplete}
                />
              ))}
            </AnimatePresence>
          </section>
        </motion.div>
      </motion.div>
      
      <AddMedicineModal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
    </div>
  );
};

export default MedicineReminder;