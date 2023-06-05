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
        <CommandItem><Link href="/findgames">See the GameID of game where team 1 played team 2?</Link></CommandItem>
        <CommandItem><Link href="/q2">What is the field goal percentage for team x?</Link></CommandItem>
        <CommandItem><Link href="/q3">What is the free throw percentage for team x?</Link></CommandItem>
        <CommandItem><Link href="/q4">What is the game score and winner for game x?</Link></CommandItem>
        <CommandItem><Link href="/q5/display">What are the ranks of the league?</Link></CommandItem>
        <CommandItem><Link href="/q6/display">What are the ranks in the Northwest conference</Link></CommandItem>
        <CommandItem><Link href="/q7">What is the 3 point field goal percentage for team x?</Link></CommandItem>
        <CommandItem><Link href="/q8">What are the ranks in the Northwest conference</Link></CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>)
}

/* <CommandItem><Link href="/q1">Who made the most points on team x during y game?</Link></CommandItem> */