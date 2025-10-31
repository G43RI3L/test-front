/*/import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const StatsCard = ({ title, value }: { title: string; value: string | number }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);*/

export const StatsCard = () => <div>📊 Card de estatísticas</div>;
