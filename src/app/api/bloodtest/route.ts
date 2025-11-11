import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const registrationsPath = path.join(process.cwd(), 'src/data/bloodtest-registrations.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(registrationsPath, 'utf8')
    const registrations = JSON.parse(fileContents)
    return NextResponse.json(registrations.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  } catch (error) {
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
    }

    const newRegistration = {
      id: Date.now().toString(),
      name: name.slice(0, 100),
      email: email?.slice(0, 100) || '',
      phone: phone.slice(0, 20),
      age: age.slice(0, 3),
      location: location.slice(0, 100),
      previouslyTested: previouslyTested || false,
      knownBloodType: knownBloodType?.slice(0, 10) || '',
      medicalConditions: medicalConditions?.slice(0, 500) || 'None',
      timestamp: new Date().toISOString(),
      status: 'pending'
    }

    registrations.push(newRegistration)
    
    await fs.writeFile(registrationsPath, JSON.stringify(registrations, null, 2))
    
    return NextResponse.json({ message: 'Registration submitted successfully', id: newRegistration.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit registration' }, { status: 500 })
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