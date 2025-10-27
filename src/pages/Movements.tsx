import { Plus, Search, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";

const Movements = () => {
  const movements = [
    {
      id: 1,
      type: "entrada",
      material: "Cimento CP-II",
      code: "CIM-001",
      quantity: 100,
      unit: "sacos",
      date: "2024-01-15 14:30",
      user: "João Silva",
      observation: "Fornecedor: Construmax",
    },
    {
      id: 2,
      type: "saida",
      material: "Areia Média",
      code: "ARE-001",
      quantity: 5,
      unit: "m³",
      date: "2024-01-15 11:20",
      user: "Maria Santos",
      observation: "Obra: Edifício Residencial",
    },
    {
      id: 3,
      type: "entrada",
      material: "Tijolo Cerâmico",
      code: "TIJ-001",
      quantity: 2000,
      unit: "unid",
      date: "2024-01-14 16:45",
      user: "Pedro Costa",
      observation: "Fornecedor: Cerâmica SP",
    },
    {
      id: 4,
      type: "saida",
      material: "Brita 1",
      code: "BRI-001",
      quantity: 3,
      unit: "m³",
      date: "2024-01-14 09:15",
      user: "Ana Lima",
      observation: "Obra: Fundação Casa 45",
    },
    {
      id: 5,
      type: "entrada",
      material: "Vergalhão 10mm",
      code: "VER-010",
      quantity: 50,
      unit: "barras",
      date: "2024-01-13 13:00",
      user: "Carlos Mendes",
      observation: "Fornecedor: Aço Brasil",
    },
    {
      id: 6,
      type: "saida",
      material: "Cimento CP-II",
      code: "CIM-001",
      quantity: 25,
      unit: "sacos",
      date: "2024-01-13 10:30",
      user: "João Silva",
      observation: "Obra: Reforma Comercial",
    },
  ];

  const MovementIcon = ({ type }: { type: string }) => {
    return type === "entrada" ? (
      <ArrowDownCircle className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowUpCircle className="h-4 w-4 text-red-500" />
    );
  };

  const MovementBadge = ({ type }: { type: string }) => {
    return type === "entrada" ? (
      <Badge className="badge-success">Entrada</Badge>
    ) : (
      <Badge className="badge-danger">Saída</Badge>
    );
  };

  const filterMovements = (type?: string) => {
    if (!type) return movements;
    return movements.filter((m) => m.type === type);
  };

  const MovementsTable = ({ data }: { data: typeof movements }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Código</TableHead>
          <TableHead>Material</TableHead>
          <TableHead className="text-right">Quantidade</TableHead>
          <TableHead>Data/Hora</TableHead>
          <TableHead>Usuário</TableHead>
          <TableHead>Observação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((movement) => (
          <TableRow key={movement.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <MovementIcon type={movement.type} />
                <MovementBadge type={movement.type} />
              </div>
            </TableCell>
            <TableCell className="font-mono text-xs">{movement.code}</TableCell>
            <TableCell className="font-medium">{movement.material}</TableCell>
            <TableCell className="text-right">
              {movement.quantity} {movement.unit}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {movement.date}
            </TableCell>
            <TableCell className="text-sm">{movement.user}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {movement.observation}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Movimentações de Estoque
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Histórico completo de entradas e saídas de materiais
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Movimentação
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar movimentações por material, código ou usuário..."
            className="pl-9"
          />
        </div>

        {/* Movements Table with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="entrada">Entradas</TabsTrigger>
                <TabsTrigger value="saida">Saídas</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <MovementsTable data={movements} />
              </TabsContent>
              <TabsContent value="entrada">
                <MovementsTable data={filterMovements("entrada")} />
              </TabsContent>
              <TabsContent value="saida">
                <MovementsTable data={filterMovements("saida")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Movements;
