import * as React from "react";

export function Card(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
      {...props}
    />
  );
}

export function CardHeader(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] pb-6"
      {...props}
    />
  );
}

export function CardTitle(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className="leading-none font-semibold"
      {...props}
    />
  );
}

export function CardDescription(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className="text-muted-foreground text-sm"
      {...props}
    />
  );
}

export function CardAction(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
      {...props}
    />
  );
}

export function CardContent(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className="px-6"
      {...props}
    />
  );
}

export function CardFooter(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className="flex items-center px-6 pt-6 border-t"
      {...props}
    />
  );
}
