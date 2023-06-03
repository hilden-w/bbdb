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

async function getData() {
  const { data, error } = await supabase
  .from('TEAM')
  .select()
  if (data != null) {return JSON.parse(JSON.stringify(data))}
}



export default async function Display() {
  const results = await getData()
  return (<Table>
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
</Table>)
}

 async function getGames() {

  const { data, error } = await supabase
  .from('GAME')
  .select('GameID')
  if (data != null) {
    return JSON.parse(JSON.stringify(data))
  }
}