import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { DateTime } from 'luxon';

export async function GET(request: Request) {
  const payload = await getPayload({
          config
        });
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const istToday = DateTime.now().setZone("Asia/Kolkata").set({ 
      hour: 0, minute: 0, second: 0, millisecond: 0 
    });

  try {
    const events = await payload.find({
      collection: 'events',
      page,
      limit,
      sort: 'date',
      where: {
        date: {
          greater_than_equal: istToday.toUTC().toISO()
        }
      }
    });

    return NextResponse.json(events);
  } catch (_error) {
    console.log(_error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}