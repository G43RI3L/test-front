import { useState, useEffect } from "react";
import { Plus, Search, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Layout } from "@/components/Layout";

interface Material {
  id: number;
  name: string;
  code: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  status: string;
  trend: string;
  category: string;
}

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);

  // ✅ Carrega materiais fixos uma vez (ou do localStorage)
  useEffect(() => {
    const saved = localStorage.getItem("materials");
    if (saved) {
      setMaterials(JSON.parse(saved));
    } else {
      const defaultMaterials = [
        {
          id: 1,
          name: "Cimento CP-II",
          code: "CIM-001",
          quantity: 450,
          unit: "sacos",
          unitPrice: 35.0,
          totalValue: 15750.0,
          status: "high",
          trend: "up",
          category: "Materiais Básicos",
        },
        {
          id: 2,
          name: "Areia Média",
          code: "ARE-001",
          quantity: 25,
          unit: "m³",
          unitPrice: 85.0,
          totalValue: 2125.0,
          status: "medium",
          trend: "down",
          category: "Agregados",
        },
      ];
      setMaterials(defaultMaterials);
      localStorage.setItem("materials", JSON.stringify(defaultMaterials));
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high":
        return <Badge className="bg-green-500 text-white">Alto</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Médio</Badge>;
      case "low":
        return <Badge className="bg-red-500 text-white">Baixo</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Materiais em Estoque
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Gerencie todos os materiais do seu inventário
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => {
              const novo = {
                id: Date.now(),
                name: "Novo Produto",
                code: "NOVO-" + Date.now().toString().slice(-3),
                quantity: 0,
                unit: "unid",
                unitPrice: 0,
                totalValue: 0,
                status: "medium",
                trend: "up",
                category: "Sem categoria",
              };
              const updated = [...materials, novo];
              setMaterials(updated);
              localStorage.setItem("materials", JSON.stringify(updated));
            }}
          >
            <Plus className="h-4 w-4" />
            Adicionar Material
          </Button>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Materiais</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Valor Unit.</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tendência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-mono text-xs">
                      {material.code}
                    </TableCell>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {material.category}
                    </TableCell>
                    <TableCell className="text-right">
                      {material.quantity} {material.unit}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {material.unitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      R$ {material.totalValue.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(material.status)}</TableCell>
                    <TableCell>
                      {material.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Materials;

