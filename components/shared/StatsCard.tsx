import { Mail, Phone, User, Users } from "lucide-react";

const statsFromBackend = [
    { id: 1, title: "Total Leads", value: 38, description: "Total leads received" },
    { id: 2, title: "Active Leads", value: 18, description: "Currently active leads" },
    { id: 3, title: "Contacted", value: 22, description: "Leads already contacted" },
    { id: 4, title: "Email Leads", value: 12, description: "Leads contacted via email" },
];

const styleConfig = [
    {
        from: "from-[#2a86ff34]", text: "#2A85FF",
        icon: <Users className="text-[#2A85FF] w-6 h-6" />
    },
    {
        from: "from-[#00a65633]", text: "#00A656",
        icon: <User className="text-[#00A656] w-6 h-6" />
    },
    {
        from: "from-[#ff9d3426]", text: "#FF9D34",
        icon: <Phone className="text-[#FF9D34] w-6 h-6" />
    },
    {
        from: "from-[#7f5fff34]", text: "#7F5FFF",
        icon: <Mail className="text-[#7F5FFF] w-6 h-6" />
    },
];

const StatsCard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsFromBackend.map((card, index) => {
                const styles = styleConfig[index % styleConfig.length];
                return (
                    <div key={card.id} className="bgGlass rounded-2xl! overflow-hidden">
                        <div
                            className={`bg-linear-to-br ${styles.from} to-[#7f5fff04] text-white p-4 shadow-md`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className={`text-lg font-semibold `}>{card.title}</h4>
                                {styles.icon}
                            </div>
                            <p className={`text-3xl mt-4 font-bold text-[${styles.text}]`}>{card.value}</p>
                            <p className="text-sm mt-2 text-gray-300">{card.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCard;