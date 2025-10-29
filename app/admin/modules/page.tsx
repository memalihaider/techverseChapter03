"use client"
import { useEffect, useState } from "react"

interface Module {
	module_id: string
	name: string
	category: string
	entry_fee: number
	min_team_size: number
	max_team_size: number
	description: string
	is_active: boolean
	display_order: number
}

export default function AdminModulesPage() {
	const [modules, setModules] = useState<Module[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		fetchModules()
	}, [])

	const fetchModules = async () => {
		try {
			const res = await fetch("/api/modules")
			const data = await res.json()
			setModules(data.modules || [])
		} catch (err) {
			setError("Failed to load modules.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-4xl mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">Competition Modules</h1>
			{loading ? (
				<div className="text-gray-500">Loading modules...</div>
			) : error ? (
				<div className="text-red-600">{error}</div>
			) : (
				<table className="min-w-full bg-white border rounded-lg overflow-hidden">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-4 py-2 text-left">Name</th>
							<th className="px-4 py-2 text-left">Category</th>
							<th className="px-4 py-2 text-left">Entry Fee</th>
							<th className="px-4 py-2 text-left">Team Size</th>
							<th className="px-4 py-2 text-left">Active</th>
						</tr>
					</thead>
					<tbody>
						{modules.map((mod) => (
							<tr key={mod.module_id} className="border-t">
								<td className="px-4 py-2 font-medium">{mod.name}</td>
								<td className="px-4 py-2">{mod.category}</td>
								<td className="px-4 py-2">{mod.entry_fee === 0 ? "Free" : `₨${mod.entry_fee}`}</td>
								<td className="px-4 py-2">{mod.min_team_size === mod.max_team_size ? mod.min_team_size : `${mod.min_team_size}-${mod.max_team_size}`}</td>
								<td className="px-4 py-2">
									{mod.is_active ? (
										<span className="text-green-600 font-semibold">Yes</span>
									) : (
										<span className="text-gray-400">No</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
