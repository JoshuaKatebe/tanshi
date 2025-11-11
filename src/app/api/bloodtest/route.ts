import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'src/data')
const registrationsPath = path.join(dataDir, 'bloodtest-registrations.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function GET() {
  try {
    const fileContents = await fs.readFile(registrationsPath, 'utf8')
    let registrations = JSON.parse(fileContents)
    
    // Normalize data types in case of inconsistencies
    registrations = registrations.map((reg: any) => ({
      ...reg,
      previouslyTested: typeof reg.previouslyTested === 'string' 
        ? reg.previouslyTested === 'true' || reg.previouslyTested === 'True'
        : Boolean(reg.previouslyTested)
    }))
    
    return NextResponse.json(registrations.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  } catch (error) {
    console.error('Error reading blood test registrations:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, age, location, previouslyTested, knownBloodType, medicalConditions } = await request.json()
    
    if (!name || !phone || !age || !location) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    let registrations = []
    try {
      const fileContents = await fs.readFile(registrationsPath, 'utf8')
      registrations = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist, start with empty array
      await ensureDataDir()
    }

    // Ensure proper data types
    const newRegistration = {
      id: Date.now().toString(),
      name: String(name).slice(0, 100),
      email: email ? String(email).slice(0, 100) : '',
      phone: String(phone).slice(0, 20),
      age: String(age).slice(0, 3),
      location: String(location).slice(0, 100),
      previouslyTested: Boolean(previouslyTested), // Ensure boolean type
      knownBloodType: knownBloodType ? String(knownBloodType).slice(0, 10) : '',
      medicalConditions: medicalConditions ? String(medicalConditions).slice(0, 500) : 'None',
      timestamp: new Date().toISOString(),
      status: 'pending'
    }

    registrations.push(newRegistration)
    
    try {
      await ensureDataDir()
      await fs.writeFile(registrationsPath, JSON.stringify(registrations, null, 2))
    } catch (fileError) {
      console.error('File system error:', fileError)
      // Even if file writing fails, we can still return success for the user
      // In production, you might want to use a database instead
      return NextResponse.json({ 
        message: 'Registration received successfully (file system unavailable)', 
        id: newRegistration.id,
        warning: 'Data may not persist due to file system limitations'
      }, { status: 201 })
    }
    
    return NextResponse.json({ message: 'Registration submitted successfully', id: newRegistration.id }, { status: 201 })
  } catch (error) {
    console.error('Blood test registration error:', error)
    return NextResponse.json({ 
      error: 'Failed to submit registration', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    
    let registrations = []
    try {
      const fileContents = await fs.readFile(registrationsPath, 'utf8')
      registrations = JSON.parse(fileContents)
    } catch (error) {
      return NextResponse.json({ error: 'Registrations not found' }, { status: 404 })
    }

    const registrationIndex = registrations.findIndex((reg: any) => reg.id === id)
    if (registrationIndex === -1) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    registrations[registrationIndex].status = status
    
    await fs.writeFile(registrationsPath, JSON.stringify(registrations, null, 2))
    
    return NextResponse.json(registrations[registrationIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
  }
}