import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ItemForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/items/${id}`);
          setName(response.data.name);
          setDescription(response.data.description);
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };
      fetchItem();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, description };
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/items/${id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/items', payload);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit Item' : 'Add New Item'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {isEdit ? 'Update Item' : 'Create Item'}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
