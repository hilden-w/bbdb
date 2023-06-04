"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import supabase from "@/utils/supabase"
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  team1: z.string({
    required_error: "Please select a team.",
  }),
  team2: z.string({
    required_error: "Please select a game.",
  }),
})

async function getTeams() {
  const {data, error} = await supabase.from("TEAM").select("Nickname")
  if (data) return JSON.parse(JSON.stringify(data))
}


export default function ComboboxReactHookForm() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [team1s, setTeam1s] = React.useState<any[]>([])
  const [team2s, setTeam2s] = React.useState<any[]>([])
  const router = useRouter();

  React.useEffect(() => {
    const loadTeams = async () => {
      setLoading(true)
      const team1s = await getTeams()
      const team2s = await getTeams()
      setTeam1s(team1s)
      setTeam2s(team2s)
      setLoading(false)
    }
    loadTeams()
  },[])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    router.push(`/findgames/display?team1=${data.team1}&team2=${data.team2}`)
  }
    return ( <>{loading?(<div>loading</div>): ( <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      { <FormField
        control={form.control}
        name="team1"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Team</FormLabel>
            <Popover>
      <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {field.value
            ? team1s.find((team1)=> team1.Nickname.toLowerCase() === field.value)?.Nickname
            : "Select team..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandEmpty>No team found.</CommandEmpty>
          <CommandGroup>
            {team1s.map((team1 : {Nickname:string}) => (
              <CommandItem
                key={team1.Nickname}
                value={team1.Nickname}
                onSelect={(value) => {
                  form.setValue("team1", value)
                  console.log(value)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === team1.Nickname ? "opacity-100" : "opacity-0"
                  )}
                />
                {team1.Nickname}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
            <FormDescription>
              select the first team for the query
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />}
       { <FormField
        control={form.control}
        name="team2"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Team</FormLabel>
            <Popover>
      <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {field.value
            ? team2s.find((team2)=> team2.Nickname.toLowerCase() === field.value)?.Nickname
            : "Select team..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandEmpty>No team found.</CommandEmpty>
          <CommandGroup>
            {team2s.map((team2 : {Nickname:string}) => (
              <CommandItem
                key={team2.Nickname}
                value={team2.Nickname}
                onSelect={(value) => {
                  form.setValue("team2", value)
                  console.log(value)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === team2.Nickname ? "opacity-100" : "opacity-0"
                  )}
                />
                {team2.Nickname}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
            <FormDescription>
              select the second team for the query
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />}
      <Button type="submit">Submit</Button>
    </form>
  </Form>)}</>)
}

