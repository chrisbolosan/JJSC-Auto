import { getAllBrackets } from '@/server/services/admin.service';
import { updateShipping } from '@/server/services/admin.service';
import { NextResponse } from 'next/server';

//  GET request for shipping brackets
export async function GET() {
  try {
    const brackets = await getAllBrackets();

    return Response.json(brackets);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updatedFields } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Shipping ID is required.' },
        { status: 400 },
      );
    }

    // Update function, passing the integer ID and the fields to change
    const data = await updateShipping(Number(id), updatedFields);

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Shipping record not found or no changes made.',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Shipping updated successfully',
      data,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
