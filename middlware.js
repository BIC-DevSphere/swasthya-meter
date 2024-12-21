import { NextResponse } from 'next/server';

export function middleware(request) {
    const cookie = request.cookies.get('next-auth.session-token');

    const path = request.nextUrl.pathname;

    const protectedRoutes = ['/dashboard', '/profile'];

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // If it's a protected route and there's no cookie, redirect to login
    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to continue
    return NextResponse.next();
}

// Configure which routes to run the middleware on
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/settings/:path*',
        
    ]
};