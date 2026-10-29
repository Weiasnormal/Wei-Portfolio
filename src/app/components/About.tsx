import { Users, HelpCircle, Sparkles, MessageCircle, Zap } from "lucide-react";
import Card from "./common/Card";
import SectionHeading from "./common/SectionHeading";
import FadeInView from "./common/FadeInView";

type AboutItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const aboutItems: AboutItem[] = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Looking to Collaborate",
    description: "Building a tech agency that serves overseas clients by creating systems and automations for their businesses.",
  },
  {
    icon: <HelpCircle className="h-6 w-6" />,
    title: "Looking for Help With",
    description: "System architecture, scalable backend design, and best practices for production-ready apps.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Currently Learning",
    description: "Software development methodologies, artificial intelligence, Scrum, public speaking mastery, and robotics.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Ask Me About",
    description: "Technology, fitness routines, content creation, entrepreneurship, and productivity systems.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fun Fact",
    description: "I practice meta-cognition — I think about how I think to improve how I learn and build.",
  },
];

export default function About() {
  return (
    <div className="pb-16">
      <SectionHeading
        title="About Me"
        subtitle="A passionate developer focused on creating innovative solutions and continuous learning."
      />

      <div className="grid grid-cols-2 gap-6 px-4 md:px-0 md:grid-cols-2 lg:grid-cols-3">
        {aboutItems.map((item, index) => (
          <FadeInView
            key={index}
            delay={index * 0.1}
            className={index === 4 ? "col-span-2 md:col-span-1" : ""}
          >
            <Card className="group h-full p-4 md:p-6 flex flex-col items-center md:items-start text-center md:text-left transition-transform duration-150 hover:scale-95 active:scale-95">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff5b1a]/10 text-[#ff5b1a]">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg md:text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-white/70 text-xs md:text-base leading-relaxed">{item.description}</p>
            </Card>
          </FadeInView>
        ))}
      </div>
    </div>
  );
}