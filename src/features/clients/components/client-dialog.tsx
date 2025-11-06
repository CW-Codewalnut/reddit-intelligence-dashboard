import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createClient, updateClient } from "@/lib/utils/api";
import type { Client } from "@/types/database";

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
  onSuccess?: () => void;
}

export function ClientDialog({ open, onOpenChange, client, onSuccess }: ClientDialogProps) {
  const [name, setName] = useState("");
  const [defaultEmail, setDefaultEmail] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setName(client.name);
      setDefaultEmail(client.default_email || "");
      setActive(client.active);
    } else {
      setName("");
      setDefaultEmail("");
      setActive(true);
    }
  }, [client, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (client) {
        await updateClient(client.id, {
          name,
          default_email: defaultEmail || null,
          active,
        });
      } else {
        await createClient({
          name,
          default_email: defaultEmail || null,
          active,
        });
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save client:", error);
      alert("Failed to save client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{client ? "Edit Client" : "Create New Client"}</DialogTitle>
            <DialogDescription>
              {client ? "Update client information" : "Add a new client to monitor"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                placeholder="Enter client name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Default Email</Label>
              <Input
                id="email"
                type="email"
                value={defaultEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDefaultEmail(e.target.value)}
                placeholder="default@example.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" checked={active} onCheckedChange={setActive} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : client ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
