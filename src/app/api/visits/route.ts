import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const visitsPath = path.join(process.cwd(), 'src/data/visits.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(visitsPath, 'utf8')
    const visits = JSON.parse(fileContents)
    return NextResponse.json(visits)
  } catch (error) {
    return NextResponse.json({ 
      totalVisits: 1247, 
      todayVisits: 23, 
      lastVisit: new Date().toISOString(),
      uniqueVisitors: 892 
    })
  }
}

export async function POST() {
  try {
    let visits = {
      totalVisits: 1247,
      todayVisits: 23,
      lastVisit: new Date().toISOString(),
      uniqueVisitors: 892
    }

    try {
      const fileContents = await fs.readFile(visitsPath, 'utf8')
      visits = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist, use defaults
    }

    // Increment visit counts
    visits.totalVisits += 1
    
    // Check if it's a new day
    const today = new Date().toDateString()
    const lastVisitDate = new Date(visits.lastVisit).toDateString()
    
    if (today === lastVisitDate) {
      visits.todayVisits += 1
    } else {
      visits.todayVisits = 1
    }
    
    visits.lastVisit = new Date().toISOString()
    
    await fs.writeFile(visitsPath, JSON.stringify(visits, null, 2))
    
    return NextResponse.json(visits)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update visit count' }, { status: 500 })
  }
}