import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
export function Tables({ valueArray}: any) {
	return (
		<div className="border-4 border-slate-500 overflow-y-auto scrollbar-hide w-[600px] h-[400px] bg-black">
			<Table className="bg-black  border-red-900 rounded">
				<TableBody>
					{valueArray.map((val: any, indx: any) => (
						<TableRow key={indx}>
							<TableCell className="border-4 text-center font-medium border-b-4 border-red-900">
								{val.split('~')[0]}
							</TableCell>
							<TableCell className="border-4 text-center font-medium border-b-4 border-red-900">
								{val.split('~')[1]}
							</TableCell>
							<TableCell className="border-4 text-center font-medium border-b-4 border-red-900">
								{val.split('~')[2]}
							</TableCell>
							{/* <TableCell className="text-center font-medium border-b-4 border-red-900">
								{dateTime}
							</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
