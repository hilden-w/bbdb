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
import * as React from "react"

async function getData() {


  const { data, error } = await supabase
  .rpc('get_rank_league')
  if (data) return JSON.parse(JSON.stringify(data))


}


export default function Display() {
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<any[]>([])
  const [isGood, setGood] = React.useState(false)

  React.useEffect(() => {
    const loadResults = async () => {
      setLoading(true)
      const results = await getData()
      console.log("results",results)
      setGood(results != null)
      setResults(results)
      setLoading(false)
    }
    loadResults()
  },[])
  //TABLE(team text, rank bigint, wins bigint, losses bigint, win_ratio numeric)
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : isGood ? (
        <Table>
          <TableCaption>Query results</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Wins</TableHead>
              <TableHead>Losses</TableHead>
              <TableHead className="text-right">Win Ratio</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: any) => (
              <TableRow key={result.Rank}>
                <TableCell className="font-medium">{result.Rank}</TableCell>
                <TableCell>{result.team}</TableCell>
                <TableCell>{result.wins}</TableCell>
                <TableCell>{result.losses}</TableCell>
                <TableCell className="text-right">{result.win_ratio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>Could not find GameID</div>
      )}
    </>
  );

}

