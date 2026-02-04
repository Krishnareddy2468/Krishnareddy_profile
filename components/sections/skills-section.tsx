import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const skillCategories = [
  // ... (keeping same data if possible? No, I need to redefine to be safe or use multi-replace to keep it)
  // I will redefine it to be safe since it's short.
  {
    title: "Programming",
    skills: [
      "Python",
      "JavaScript/TypeScript",
      "C++",
      "Java",
      "SQL",
      "Go",
    ],
  },
  {
    title: "AI / ML / DL",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Hugging Face",
      "LangChain",
      "OpenAI API",
    ],
  },
  {
    title: "Frameworks & Tools",
    skills: [
      "React/Next.js",
      "FastAPI/Flask",
      "Docker",
      "AWS/GCP",
      "Git",
      "PostgreSQL",
    ],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="skills" className="py-24 px-4 relative" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-foreground">
            Technologies I Work With
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={cinematicStagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={fadeInUp}>
              <GlassCard className="p-8 h-full" hover={false}>
                <h3 className="text-xl font-semibold mb-6 text-foreground">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, idx) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
