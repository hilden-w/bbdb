import Link from 'next/link';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"


export default async function Home() {
    return (<Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Queries">
        <CommandItem><Link href="/q1">Who made the most points on team y during x game?</Link></CommandItem>
        <CommandItem>What is (player) 3 point success rate?</CommandItem>
        <CommandItem>During the game of x vs y, who performed best?</CommandItem>
        <CommandItem>Wins and losses of team x against team y of all time?</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>)
}