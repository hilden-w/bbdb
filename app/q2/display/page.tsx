'use client'
import supabase from '@/utils/supabase'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSearchParams } from 'next/navigation';
import * as React from "react"


async function getData(team1 : any) {
  team1 = team1.charAt(0).toUpperCase() + team1.slice(1);
  const { data, error } = await supabase
  .rpc('get_fg_perc', {
    team1
  })
  if (data) return JSON.parse(JSON.stringify(data))

}


export default function Display() {
  const [loading, setLoading] = React.useState(false)
  const [isGood, setGood] = React.useState(false)
  const [results, setResults] = React.useState<any[]>([])
  const searchParams = useSearchParams()
  const team = searchParams.get('team')
  console.log("DATA!  ",team)
  React.useEffect(() => {
    const loadResults = async () => {
      setLoading(true)
      const results = await getData(team)
      console.log(results)
      setGood(results != null)
      setResults(results)
      setLoading(false)
    }
    loadResults()
  },[])

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : isGood ? (
        <Table>
          <TableCaption>Query results</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Team</TableHead>
              <TableHead className="text-right">Field goal Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: any) => (
              <TableRow key={result.team}>
                <TableCell className="font-medium">{result.team}</TableCell>
                <TableCell className="text-right">{result.field_goal_percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : <div>No results found</div>}
    </>
  );

}

