import { Key } from 'react'
import supabase from '../../utils/supabase'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function getData() {
  // Fetch data from your API here.
  const { data, error } = await supabase
  .from('LINE_SCORE')
  .select()
  if (data != null) {return JSON.parse(JSON.stringify(data))}
}



export default async function Home() {
  const results = await getData()
  return (<Table>
  <TableCaption>Query results</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Game ID</TableHead>
      <TableHead>Home Points</TableHead>
      <TableHead className="text-right">Away Points</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {results.map((result: any) => (
          <TableRow key={result.GameID}>
          <TableCell className="font-medium">{result.GameID}</TableCell>
          <TableCell>{result.Pts_Home}</TableCell>
          <TableCell className="text-right">{result.Pts_Away}</TableCell>
        </TableRow>
    ))}
  </TableBody>
</Table>)
}