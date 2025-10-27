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

const Materials = () => {
  const materials = [
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
    {
      id: 3,
      name: "Tijolo Cerâmico",
      code: "TIJ-001",
      quantity: 8500,
      unit: "unid",
      unitPrice: 0.85,
      totalValue: 7225.0,
      status: "high",
      trend: "up",
      category: "Alvenaria",
    },
    {
      id: 4,
      name: "Brita 1",
      code: "BRI-001",
      quantity: 8,
      unit: "m³",
      unitPrice: 95.0,
      totalValue: 760.0,
      status: "low",
      trend: "down",
      category: "Agregados",
    },
    {
      id: 5,
      name: "Vergalhão 10mm",
      code: "VER-010",
      quantity: 120,
      unit: "barras",
      unitPrice: 45.0,
      totalValue: 5400.0,
      status: "medium",
      trend: "up",
      category: "Ferragens",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high":
        return <Badge className="badge-success">Alto</Badge>;
      case "medium":
        return <Badge className="badge-warning">Médio</Badge>;
      case "low":
        return <Badge className="badge-danger">Baixo</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Materiais em Estoque
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Gerencie todos os materiais do seu inventário
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Material
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar materiais por nome ou código..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Materials Table */}
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
