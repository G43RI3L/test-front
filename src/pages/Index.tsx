import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const Index = () => (
  <Layout>
    <div className="grid gap-4 md:grid-cols-2">
      <Link to="/materials">
        <Card className="cursor-pointer hover:bg-accent transition">
          <CardHeader>
            <CardTitle>Materiais</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o estoque de materiais, adicione novos e leia QR Codes.</p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/movements">
        <Card className="cursor-pointer hover:bg-accent transition">
          <CardHeader>
            <CardTitle>Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Registre entradas e saídas de materiais com data e hora.</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  </Layout>
);

export default Index;
