'use client'
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"


export function LayoutTransition({ children, className, style, initial, animate, exit, }) {
	const path = usePathname()
	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div className={className} style={style} key={path} initial={initial} animate={animate} exit={exit} >
				{children}
			</motion.div>
		</AnimatePresence>
	)
}