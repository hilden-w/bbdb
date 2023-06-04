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
        <CommandItem><Link href="/q2">What is (player) 3 point success rate?</Link></CommandItem>
        <CommandItem><Link href="/q3">During the game of x vs y, who performed best?</Link></CommandItem>
        <CommandItem><Link href="/q4">Wins and losses of team x against team y of all time?</Link></CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>)
}