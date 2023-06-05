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
  team: z.string({
    required_error: "Please select a team.",
  }),
})

async function getTeams() {
  const {data, error} = await supabase.from("TEAM").select("Nickname")
  if (data) return JSON.parse(JSON.stringify(data))
}


export default function ComboboxReactHookForm() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [teams, setTeams] = React.useState<any[]>([])
  const router = useRouter();

  React.useEffect(() => {
    const loadTeams = async () => {
      setLoading(true)
      const teams = await getTeams()
      setTeams(teams)
      setLoading(false)
    }
    loadTeams()
  },[])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    router.push(`/q3/display?team=${data.team}`)
  }
    return ( <>{loading?(<div>loading</div>): ( <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      { <FormField
        control={form.control}
        name="team"
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
            ? teams.find((team)=> team.Nickname.toLowerCase() === field.value)?.Nickname
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
            {teams.map((team : {Nickname:string}) => (
              <CommandItem
                key={team.Nickname}
                value={team.Nickname}
                onSelect={(value) => {
                  form.setValue("team", value)
                  console.log(value)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === team.Nickname ? "opacity-100" : "opacity-0"
                  )}
                />
                {team.Nickname}
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
      <Button type="submit">Submit</Button>
    </form>
  </Form>)}</>)
}

