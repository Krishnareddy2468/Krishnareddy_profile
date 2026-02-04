import type { Variants, Transition } from "framer-motion"

/**
 * Cinematic Motion System
 * Heavy, intentional, controlled - no bounce, no spring
 */

// Base transition - smooth, controlled, no bounce
export const transition: Transition = {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1] as const, // Cinematic ease-out
}

// Faster transition for micro-interactions
export const fastTransition: Transition = {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1] as const,
}

// Slow, heavy transition for dramatic reveals
export const heavyTransition: Transition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const, // Heavy deceleration
}

// Stagger container - for card grids
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

// Slower stagger for dramatic effect
export const cinematicStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

// Fade + depth movement (z-axis feel via y + opacity + scale)
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30, // Subtle rise
        scale: 0.98, // Slight depth
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
}

// Deeper movement for hero elements
export const fadeInDeep: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.96, // More pronounced depth
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.0,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
}

// Fade in with no movement (for backgrounds)
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
}

// Scale in (controlled, no bounce)
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
}

// Slide in from left
export const slideInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -20, // Subtler
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
}

// Slide in from right
export const slideInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
}

// Card reveal with depth
export const cardReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.97,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
}

// Navbar reveal
export const navReveal: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.3,
        },
    },
}

// Text line reveal (for hero text)
export const textReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

// Viewport settings for scroll-triggered animations
export const viewportSettings = {
    once: true,
    margin: "-80px" as const,
    amount: 0.2 as const,
}
