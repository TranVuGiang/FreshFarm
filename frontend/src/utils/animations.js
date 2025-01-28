import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

export const animateWidthGsap = (target, animationProps, scrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: 'restart reverse reverse reverse'
        },
        start: 'top 85%',
        ...scrollProps
    })
}
