'use client';
import { useState, useEffect } from 'react';
import { Tables } from '@/server/types/database.types';
import ReturnButton from '@/components/returnButton';

type Bracket = Tables<'SHIPPING_BRACKET'>;

export default function ShippingPage() {
  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editForm, setEditForm] = useState({
    min_weight: '',
    max_weight: '',
    shipping_charge: '',
  });

  // Load data from Supabase when the component mounts
  //https://react.dev/reference/react/useEffect#fetching-data-with-effects
  useEffect(() => {
    fetch('/api/shipping').then((res) =>
      res.json().then((data: Bracket[]) => setBrackets(data ?? [])),
    );
  }, []);

  // Populate form with current row values
  const startEdit = (bracket: Bracket) => {
    setEditingId(bracket.id);
    setEditForm({
      min_weight: String(bracket.min_weight ?? ''),
      max_weight: String(bracket.max_weight ?? ''),
      shipping_charge: String(bracket.shipping_charge ?? ''),
    });
  };

  // Save edits by sending a request back to API
  const saveEdit = async (id: number) => {
    const updatedToNumber = {
      min_weight: Number(editForm.min_weight),
      max_weight: Number(editForm.max_weight),
      shipping_charge: Number(editForm.shipping_charge),
    };
    try {
      const res = await fetch(`/api/shipping`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          id,
          ...updatedToNumber,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update on the backend');
      }

      // Update local state upon successful API response
      // Pass back to brackets as a number
      setBrackets(
        brackets.map((bracket) =>
          bracket.id === id ? { ...bracket, ...updatedToNumber } : bracket,
        ),
      );
      setEditingId(null);
    } catch (error) {
      console.error('Error saving bracket:', error);
      alert('Failed to save changes.');
    }
  };

  return (
    <div style={{ padding: '20px' }} className="text-green-500">
      <h2>Weight Brackets</h2>

      <table className="table-auto w-full bg-white border border-gray-300">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Min Weight</th>
            <th className="border border-gray-300 px-4 py-2">Max Weight</th>
            <th className="border border-gray-300 px-4 py-2">
              Shipping Charge
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brackets.map((bracket) => {
            const isEditing = editingId === bracket.id;

            return (
              <tr key={bracket.id} className="hover:bg-green-100">
                {/* Min Weight Column */}
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.min_weight}
                      onChange={(e) =>
                        setEditForm({ ...editForm, min_weight: e.target.value })
                      }
                    />
                  ) : (
                    bracket.min_weight
                  )}
                </td>

                {/* Max Weight Column */}
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.max_weight}
                      onChange={(e) =>
                        setEditForm({ ...editForm, max_weight: e.target.value })
                      }
                    />
                  ) : (
                    bracket.max_weight
                  )}
                </td>

                {/* Shipping Charge Column */}
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.shipping_charge}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          shipping_charge: e.target.value,
                        })
                      }
                    />
                  ) : (
                    `$${bracket.shipping_charge}`
                  )}
                </td>

                {/* Action Buttons */}
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing ? (
                    <>
                      <button
                        className="px-4"
                        onClick={() => saveEdit(bracket.id)}
                      >
                        Save
                      </button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(bracket)}>Edit</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="m-4">
        <ReturnButton
          href="/admin"
          label="LET'S GO!"
          styles="bg-red-400 border border-white rounded p-4"
        ></ReturnButton>
      </div>
    </div>
  );
}
