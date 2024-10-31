'use client';
import img from '@/app/contacts/_img/nostalgia-4397880_1280.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
const ContactsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('Email sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('Failed to send email.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <Image
        className="float-left mr-6 mb-2 max-md:float-none"
        src={img}
        alt="Contact nostalgia image"
        width={500}
        height={300}
      />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure sapiente quibusdam laboriosam
        dignissimos voluptatibus dolorum molestiae illo vitae praesentium! Facilis qui dignissimos,
        explicabo cumque saepe temporibus, placeat quaerat est culpa sed ducimus fugit consectetur
        deleniti voluptas corporis debitis quis vero nihil? Pariatur, sint maiores dolores ab nemo
        repudiandae id totam inventore atque, eius, delectus illum alias obcaecati hic? Magni quidem
        reiciendis velit minus corrupti nisi aliquam, distinctio assumenda id nemo sit perspiciatis
        voluptatum quibusdam laboriosam labore adipisci obcaecati quaerat. Dignissimos accusantium
        nostrum consectetur. Cumque adipisci tenetur aspernatur enim nemo accusantium magni
        necessitatibus quae voluptatibus. Excepturi amet aliquam architecto accusantium explicabo!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure sapiente quibusdam laboriosam
        dignissimos voluptatibus dolorum molestiae illo vitae praesentium! Facilis qui dignissimos,
        explicabo cumque saepe temporibus, placeat quaerat est culpa sed ducimus fugit consectetur
        deleniti voluptas corporis debitis quis vero nihil? Pariatur, sint maiores dolores ab nemo
        repudiandae id totam inventore atque, eius, delectus illum alias obcaecati hic? Magni quidem
        reiciendis velit minus corrupti nisi aliquam, distinctio assumenda id nemo sit perspiciatis
        voluptatum quibusdam laboriosam labore adipisci obcaecati quaerat. Dignissimos accusantium
        nostrum consectetur. Cumque adipisci tenetur aspernatur enim nemo accusantium magni
        necessitatibus quae voluptatibus. Excepturi amet aliquam architecto accusantium explicabo!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure sapiente quibusdam laboriosam
        dignissimos voluptatibus dolorum molestiae illo vitae praesentium! Facilis qui dignissimos,
        explicabo cumque saepe temporibus, placeat quaerat est culpa sed ducimus fugit consectetur
        deleniti voluptas corporis debitis quis vero nihil? Pariatur, sint maiores dolores ab nemo
        repudiandae id totam inventore atque, eius, delectus illum alias obcaecati hic? Magni quidem
        reiciendis velit minus corrupti nisi aliquam, distinctio assumenda id nemo sit perspiciatis
        voluptatum quibusdam laboriosam labore adipisci obcaecati quaerat. Dignissimos accusantium
        nostrum consectetur. Cumque adipisci tenetur aspernatur enim nemo accusantium magni
        necessitatibus quae voluptatibus. Excepturi amet aliquam architecto accusantium explicabo!
      </p>
      <h2 className="my-2 text-2xl font-bold">Contact Us</h2>
      <form onSubmit={handleSubmit} className="max-w-sm my-2">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="mb-2"
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="mb-2"
        />
        <Input
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="mb-2"
        />
        <Button type="submit" className="mb-1">
          Send
        </Button>
        <p>{status}</p>
      </form>
    </div>
  );
};

export default ContactsPage;
