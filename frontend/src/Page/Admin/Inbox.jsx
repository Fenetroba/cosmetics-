import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { FaSearch, FaEnvelope, FaEnvelopeOpen, FaTrash, FaSpinner, FaPaperPlane } from 'react-icons/fa';
import { fetchMessages, sendMessage, markAsRead, deleteMessage } from '../../redux/features/messageSlice';
import { Button } from '@/Components/ui/button';

const Inbox = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.messages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newMessage, setNewMessage] = useState({
    subject: '',
    content: '',
    recipient: ''
  });

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendMessage(newMessage)).unwrap();
      toast.success('Message sent successfully');
      setShowComposeModal(false);
      setNewMessage({ subject: '', content: '', recipient: '' });
    } catch (error) {
      toast.error(error || 'Error sending message');
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await dispatch(markAsRead(messageId)).unwrap();
      toast.success('Message marked as read');
    } catch (error) {
      toast.error(error || 'Error marking message as read');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await dispatch(deleteMessage(messageId)).unwrap();
      toast.success('Message deleted successfully');
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      toast.error(error || 'Error deleting message');
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Message list item component
  const MessageListItem = ({ message }) => (
    <div
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
        !message.read ? 'bg-blue-50' : ''
      }`}
      onClick={() => {
        setSelectedMessage(message);
        if (!message.read) {
          handleMarkAsRead(message._id);
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {message.read ? (
            <FaEnvelopeOpen className="text-gray-400" />
          ) : (
            <FaEnvelope className="text-blue-500" />
          )}
          <div>
            <h3 className="font-medium">{message.subject}</h3>
            <p className="text-sm text-gray-600">
              From: {message.sender.username}
              {message.sender.email && ` (${message.sender.email})`}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(message.createdAt), 'MMM d, yyyy')}
        </div>
      </div>
    </div>
  );

  // Compose message modal
  const ComposeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Compose Message</h2>
          <button
            onClick={() => setShowComposeModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="text"
              value={newMessage.recipient}
              onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={newMessage.subject}
              onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowComposeModal(false)}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <button
            onClick={() => setShowComposeModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
          >
            <FaPaperPlane />
            <span>Compose</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No messages found
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <MessageListItem key={message._id} message={message} />
              ))}
            </div>
          )}
        </div>

        {/* Selected Message View */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-medium">
                    {selectedMessage.sender.username}
                    {selectedMessage.sender.email && ` (${selectedMessage.sender.email})`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">
                    {format(new Date(selectedMessage.createdAt), 'PPP')}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
                {selectedMessage.sender.email && (
                  <div className="border-t pt-4">
                    <Button
                      onClick={() => {
                        setShowComposeModal(true);
                        setNewMessage({
                          subject: `Re: ${selectedMessage.subject}`,
                          content: '',
                          recipient: selectedMessage.sender.email
                        });
                        setSelectedMessage(null);
                      }}
                      className="flex items-center space-x-2"
                    >
                      <FaPaperPlane />
                      <span>Reply</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Compose Modal */}
        {showComposeModal && <ComposeModal />}
      </div>
    </div>
  );
};

export default Inbox;