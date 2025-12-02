import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { FEATURES } from "../../lib/constants";

export function LandingFeatures() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Core Features</h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to monitor and engage with Reddit effectively
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <Card
            key={index}
            className="hover:border-lw-primary/50 border-2 transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-lw-primary/10 rounded-lg p-2">
                  <feature.icon className="text-lw-primary h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
