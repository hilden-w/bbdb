import { Key } from 'react'
import supabase from '../utils/supabase'
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
  .from('PLAYER')
  .select()
  if (data != null) {return JSON.parse(JSON.stringify(data))}
}



export default async function Home() {
  const results = await getData()
  return (<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">id</TableHead>
      <TableHead>name</TableHead>
      <TableHead className="text-right">is_active</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {results.map((result: any) => (
          <TableRow>
          <TableCell className="font-medium">{result.ID}</TableCell>
          <TableCell>{result.Name}</TableCell>
          <TableCell className="text-right">{result.Is_Active}</TableCell>
        </TableRow>
    ))}
  </TableBody>
</Table>)

}