import { lazy } from "react";


// Public Routes
export const HomePage = lazy(() => import('@/pages/home'));
export const ProductCategoryPage = lazy(() => import('@/pages/products-list'));
export const AboutPage = lazy(() => import('@/pages/aboutUs'));
export const ContactPage = lazy(() => import('@/pages/contact'));
export const SearchPages = lazy(() => import('@/pages/search'));
export const ProductDetailPage = lazy(() => import('@/pages/products-detail'))
// Private Routes