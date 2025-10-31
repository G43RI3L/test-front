import { Layout } from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-lg text-muted-foreground">Página não encontrada</p>
    </div>
  </Layout>
);

export default NotFound;
