import { useState, useEffect } from "react";
import { Plus, TrendingDown, TrendingUp, QrCode } from "lucide-react";
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
import { Html5QrcodeScanner } from "html5-qrcode";

interface Material {
  id: number;
  name: string;
  code: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  lastMonthPrice?: number;
  status: string;
  category: string;
}

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    quantity: 0,
    unit: "",
    unitPrice: 0,
    category: "",
  });
  const [thresholds, setThresholds] = useState({
    high: 100,
    medium: 50,
    low: 10,
  });
  const [showScanner, setShowScanner] = useState(false);

  // ✅ Carrega dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("materials");
    if (saved) setMaterials(JSON.parse(saved));
  }, []);

  const saveMaterials = (data: Material[]) => {
    setMaterials(data);
    localStorage.setItem("materials", JSON.stringify(data));
  };

  // ✅ Cálculo automático do status com base nos thresholds
  const getStatus = (qtd: number) => {
    if (qtd >= thresholds.high) return "high";
    if (qtd >= thresholds.medium) return "medium";
    return "low";
  };

  // ✅ Badge de status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high":
        return <Badge className="bg-green-500 text-white">Em estoque</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Médio</Badge>;
      case "low":
        return <Badge className="bg-red-500 text-white">Baixo</Badge>;
      default:
        return null;
    }
  };

  // ✅ Adicionar novo material manualmente
  const handleAddMaterial = () => {
    if (!newMaterial.name) return alert("Informe o nome do material.");

    const total = newMaterial.quantity * newMaterial.unitPrice;
    const status = getStatus(newMaterial.quantity);

    const novo: Material = {
      id: Date.now(),
      name: newMaterial.name,
      code: "MAT-" + Date.now().toString().slice(-4),
      quantity: newMaterial.quantity,
      unit: newMaterial.unit,
      unitPrice: newMaterial.unitPrice,
      totalValue: total,
      status,
      category: newMaterial.category || "Sem categoria",
      lastMonthPrice: newMaterial.unitPrice * 0.95, // simulação
    };

    const updated = [...materials, novo];
    saveMaterials(updated);
    setNewMaterial({ name: "", quantity: 0, unit: "", unitPrice: 0, category: "" });
  };

  // ✅ Iniciar leitura de QR Code
  const startScanner = () => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
    scanner.render(
      (decodedText: string) => {
        try {
          const data = JSON.parse(decodedText);
          setNewMaterial(data);
          alert("QR Code lido com sucesso!");
        } catch {
          alert("Formato de QR Code inválido!");
        }
        scanner.clear();
        setShowScanner(false);
      },
      (errorMessage: string) => console.warn(errorMessage)
    );
  };

  // ✅ useEffect para iniciar scanner quando showScanner mudar
  useEffect(() => {
    if (showScanner) startScanner();
  }, [showScanner]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Materiais em Estoque
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Gerencie, adicione e monitore seus materiais com QR Code ou manualmente
            </p>
          </div>
          <Button className="gap-2" onClick={() => setShowScanner(!showScanner)}>
            <QrCode className="h-4 w-4" />
            Ler QR Code
          </Button>
        </div>

        {/* Leitor de QR Code */}
        {showScanner && <div id="reader" className="my-4" />}

        {/* Formulário de novo material */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Material</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nome"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Quantidade"
              value={newMaterial.quantity}
              onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
            />
            <Input
              placeholder="Unidade (ex: sacos, m³)"
              value={newMaterial.unit}
              onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Preço Unitário"
              value={newMaterial.unitPrice}
              onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: Number(e.target.value) })}
            />
            <Input
              placeholder="Categoria"
              value={newMaterial.category}
              onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
            />
            <Button className="col-span-2" onClick={handleAddMaterial}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar Material
            </Button>
          </CardContent>
        </Card>

        {/* Tabela de materiais */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Materiais</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead className="text-right">Preço Unit.</TableHead>
                  <TableHead className="text-right">Variação</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((m) => {
                  const variation = m.lastMonthPrice
                    ? ((m.unitPrice - m.lastMonthPrice) / m.lastMonthPrice) * 100
                    : 0;
                  return (
                    <TableRow key={m.id}>
                      <TableCell className="font-mono text-xs">{m.code}</TableCell>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>{m.category}</TableCell>
                      <TableCell className="text-right">{m.quantity} {m.unit}</TableCell>
                      <TableCell className="text-right">R$ {m.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        {variation >= 0 ? (
                          <span className="text-green-500 flex items-center justify-end gap-1">
                            <TrendingUp className="h-4 w-4" /> {variation.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center justify-end gap-1">
                            <TrendingDown className="h-4 w-4" /> {variation.toFixed(1)}%
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        R$ {m.totalValue.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(m.status)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Materials;
