import { Package, TrendingUp, AlertCircle } from "lucide-react";
import { StatsCard } from "../pages/StatsCard";
import { MaterialsList } from "../pages/MaterialsList";
import { RecentTransactions } from "../pages/RecentTransactions";
import { Layout } from "./Layout";

export const Dashboard = () => {
  const stats = [
    {
      title: "Valor Total do Estoque",
      value: "R$ 347.850,00",
      icon: Package,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Materiais em Estoque",
      value: "2.847",
      icon: TrendingUp,
      trend: "+5.2%",
      trendUp: true,
    },
    {
      title: "Itens em Baixa",
      value: "12",
      icon: AlertCircle,
      trend: "-3 esta semana",
      trendUp: false,
    },
  ];

  return (
    <Layout>
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <MaterialsList />
        <RecentTransactions />
      </div>
    </Layout>
  );
};
