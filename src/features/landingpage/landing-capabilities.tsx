import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { CAPABILITIES } from "../../lib/constants";

export function LandingCapabilities() {
  return (
    <section className="bg-muted/30 container mx-auto my-16 rounded-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Dashboard Capabilities</h2>
        <p className="text-muted-foreground text-lg">
          Powerful tools to manage and analyze your Reddit presence
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((capability, index) => (
          <Card key={index} className="text-center transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="bg-lw-accent/10 mx-auto mb-3 w-fit rounded-full p-3">
                <capability.icon className="text-lw-accent h-8 w-8" />
              </div>
              <CardTitle className="text-lg">{capability.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{capability.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
