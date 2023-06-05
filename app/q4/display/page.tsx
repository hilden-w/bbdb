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

async function getData(gamenum : any) {

  const { data, error } = await supabase
  .rpc('get_game_score', {
    gamenum
  })

  if (data)return data;

}


export default function Display() {
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<any[]>([])
  const [isGood, setGood] = React.useState(false)
  const searchParams = useSearchParams()
  const game = searchParams.get('game')

  React.useEffect(() => {
    const loadResults = async () => {
      setLoading(true)
      const results = await getData(game)
      console.log("results",results)
      setGood(results != null)
      setResults(results)

      setLoading(false)
    }
    loadResults()
  },[])
  //TABLE(hteam text, hscore bigint, ateam text, ascore bigint, winner text)
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : isGood ? (
        <Table>
          <TableCaption>Query results</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Winner</TableHead>
              <TableHead>Home Team</TableHead>
              <TableHead>Home Team Score</TableHead>
              <TableHead>Away Team</TableHead>
              <TableHead className="text-right">Away Team Score</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: any) => (
              <TableRow key={result.winner}>
                <TableCell className="font-medium">{result.winner}</TableCell>
                <TableCell>{result.hteam}</TableCell>
                <TableCell>{result.hscore}</TableCell>
                <TableCell>{result.ateam}</TableCell>
                <TableCell className="text-right">{result.ascore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>Could not find GameID or no results found</div>
      )}
    </>
  );

}

