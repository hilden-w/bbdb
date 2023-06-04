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


async function getData() {
  const { data, error } = await supabase
  .from('TEAM')
  .select()
  if (data != null) {return JSON.parse(JSON.stringify(data))}
}


export default function Display() {
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<any[]>([])
  // const searchParams = useSearchParams()
  // const Nickname = searchParams.get('Nickname')
  // const GameID = searchParams.get('GameID')
  // console.log("DATA!  ",Nickname, GameID)
  React.useEffect(() => {
    const loadResults = async () => {
      setLoading(true)
      const results = await getData()
      console.log(results)
      setResults(results)
      setLoading(false)
    }
    loadResults()
  },[])

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <Table>
          <TableCaption>Query results</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nickname</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Abbr</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: any) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.Nickname}</TableCell>
                <TableCell>{result.City}</TableCell>
                <TableCell>{result.State}</TableCell>
                <TableCell className="text-right">{result.Abbr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

