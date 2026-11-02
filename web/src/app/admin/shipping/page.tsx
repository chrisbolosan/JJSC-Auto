'use client';
import { useState, useEffect} from 'react';

interface Bracket {
  id: string | number; // supports either string (UUID) or number IDs
  min_weight: string | number;
  max_weight: string | number;
  shipping_charge: string | number;
}


export default function ShippingPage() {

  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editForm, setEditForm] = useState({
    min_weight: '',
    max_weight: '',
    shipping_charge: ''
  });
 
  async function fetchBrackets() {
    const res = await fetch('/api/shipping');
    const data = await res.json();

    setBrackets(data.brackets || data || []);
  } 

  // Load data from Supabase when the component mounts
  useEffect(() => {
    fetchBrackets();
  }, []);

  // Populate form with current row values
  const startEdit = (bracket: Bracket) => {
    setEditingId(bracket.id);
    setEditForm({
      min_weight: bracket.min_weight || '',
      max_weight: bracket.max_weight || '',
      shipping_charge: bracket.shipping_charge || ''
    });
  };

  // Save edits by sending a request back to API
  const saveEdit = async (id: Bracket) => {
    try {
      const res = await fetch(`/api/shipping`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          min_weight: editForm.min_weight,
          max_weight: editForm.max_weight,
          shipping_charge: editForm.shipping_charge
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update on the backend');
      }

      // Update local state upon successful API response
      setBrackets(
        brackets.map((bracket) => 
          bracket.id === id ? { ...bracket, ...editForm } : bracket
        )
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
            <th className="border border-gray-300 px-4 py-2">Shipping Charge</th>
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
                      onChange={(e) => setEditForm({ ...editForm, min_weight: e.target.value })}
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
                      onChange={(e) => setEditForm({ ...editForm, max_weight: e.target.value })}
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
                      onChange={(e) => setEditForm({ ...editForm, shipping_charge: e.target.value })}
                    />
                  ) : (
                    `$${bracket.shipping_charge}`
                  )}
                </td>

                {/* Action Buttons */}
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing ? (
                    <>
                      <button className="px-4" onClick={() => saveEdit(bracket.id)}>Save</button>
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
    </div>
  );
}
