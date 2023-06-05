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

async function getData(team1 : any, team2: any) {
  team1 = team1.charAt(0).toUpperCase() + team1.slice(1);
  team2 = team2.charAt(0).toUpperCase() + team2.slice(1);
  console.log("team 1",team1)
  console.log("team 2",team2)
  const { data, error } = await supabase.rpc('get_games', {team1: team1, team2: team2})
  if (data != null) {return JSON.parse(JSON.stringify(data))}
}

//TABLE(team text, vs_team text, gameid bigint, date timestamp with time zone)

export default function Display() {
  const [loading, setLoading] = React.useState(false)
  const [isGood, setGood] = React.useState(false)
  const [results, setResults] = React.useState<any[]>([])
  const searchParams = useSearchParams()
  const team1 = searchParams.get('team1')
  const team2 = searchParams.get('team2')

  React.useEffect(() => {
    const loadResults = async () => {
      setLoading(true)
      const results = await getData(team1, team2)
      console.log("results",results)
      setGood(results != null)
      if (isGood) {
        results.forEach((result: any) => {
          let temp = result.date.toString()
          result.date = temp.split('T')[0]
        })
      }
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
              <TableHead className="w-[100px]">GameID</TableHead>
              <TableHead>Team 1</TableHead>
              <TableHead>Team 2</TableHead>

              <TableHead className="text-right">Date</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: any) => (
              <TableRow key={result.GameID}>
                <TableCell className="font-medium">{result.gameid}</TableCell>
                <TableCell>{result.team}</TableCell>
                <TableCell>{result.vs_team}</TableCell>
                <TableCell className="text-right">{result.date}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : <div>No results found</div>}
    </>
  );
}

