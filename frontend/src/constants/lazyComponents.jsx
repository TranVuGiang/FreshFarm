import { lazy } from "react";


// Public Routes
export const HomePage = lazy(() => import('@/pages/home'));
export const ProductCategoryPage = lazy(() => import('@/pages/products-list'));
export const AboutPage = lazy(() => import('@/pages/aboutUs'));
export const ContactPage = lazy(() => import('@/pages/contact'));

// Private Routes