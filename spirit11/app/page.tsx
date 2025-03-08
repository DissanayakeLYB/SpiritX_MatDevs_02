"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

// Define the Player type
type Player = {
  name: string;
  university: string;
  role: string;
};

const PlayersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<Player>({
    name: '',
    university: '',
    role: '',
  });
  const [players, setPlayers] = useState<Player[]>([
    { name: 'James Anderson', university: 'Oxford University', role: 'Bowler' },
    { name: 'Vivat Smith', university: 'Cambridge University', role: 'Batsman' },
    { name: 'Ben Stokes', university: 'Durham University', role: 'All-Rounder' },
    { name: 'Kane Williams', university: 'Victoria University', role: 'Batsman' },
    { name: 'Mitchell Stark', university: 'Sydney University', role: 'Bowler' },
    { name: 'Joe Root', university: 'Leeds University', role: 'All-Rounder' },
  ]);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter ? player.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (player: Player) => {
    console.log('Edit player:', player);
  };

  const handleDelete = (player: Player) => {
    setPlayers(players.filter((p) => p.name !== player.name));
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    setPlayers([...players, newPlayer]);
    setNewPlayer({ name: '', university: '', role: '' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className=" py-5 px-0 w-full mx-auto">
        <div className="container w-full mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={30}
              height={30}
              className="mr-2"
            />
            <Link href="/" className="text-xl font-bold">
              Spirit11
            </Link>
          </div>
          <div className="flex gap-8">
            <Link href="/players" className="hover:text-gray-400 rounded-lg transition-colors">
              Players
            </Link>
            <Link href="/team" className="hover:text-gray-400 rounded-lg transition-colors">
              Team
            </Link>
            <Link href="/leaderboard" className="hover:text-gray-400 rounded-lg transition-colors">
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-2 mx-auto w-7xl">
        <h1 className="text-2xl font-bold mb-6">Players Management</h1>
        <div className="mb-4 flex gap-4 justify-between">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-100 p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
              >
              <option value="">All Roles</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add New Player'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddPlayer} className="mb-6 p-4 border border-gray-700 rounded bg-gray-800">
            <h2 className="text-xl font-bold mb-4">Add New Player</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Player Name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                className="p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
                required
              />
              <input
                type="text"
                placeholder="University"
                value={newPlayer.university}
                onChange={(e) => setNewPlayer({ ...newPlayer, university: e.target.value })}
                className="p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
                required
              />
              <select
                value={newPlayer.role}
                onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                className="p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
                required
              >
                <option value="">Select Role</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
              </select>
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Add Player
              </button>
            </div>
          </form>
        )}

        <div className="w-full overflow-x-auto justify-center">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4 border-b">Player Name</th>
                <th className="py-2 px-4 border-b">University</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="py-2 px-4 border-b text-center">{player.name}</td>
                  <td className="py-2 px-4 border-b text-center">{player.university}</td>
                  <td className="py-2 px-4 border-b text-center">{player.role}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEdit(player)}
                      className="mx-10 text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(player)}
                      className="mx-10 text-red-400 hover:text-red-300 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;