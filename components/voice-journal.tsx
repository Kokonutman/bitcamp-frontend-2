"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export function VoiceJournal() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const togglePlayback = () => {
    if (!audioElement.current || !audioURL) return;

    if (isPlaying) {
      audioElement.current.pause();
    } else {
      audioElement.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="p-6 glass-card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4 text-foreground/90">Voice Journal</h2>
      
      <div className="space-y-6">
        <motion.div
          className="flex justify-center"
          animate={isRecording ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } } : {}}
        >
          <Button
            size="lg"
            variant={isRecording ? "destructive" : "outline"}
            onClick={isRecording ? stopRecording : startRecording}
            className="rounded-full w-16 h-16 flex items-center justify-center"
          >
            {isRecording ? (
              <Square className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
        </motion.div>

        {audioURL && (
          <div className="space-y-4">
            <audio ref={audioElement} src={audioURL} onEnded={() => setIsPlaying(false)} />
            <div className="flex justify-center">
              <Button variant="outline" size="icon" onClick={togglePlayback}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-muted-foreground">
          {isRecording ? "Recording... Click to stop" : "Click the microphone to start recording"}
        </p>
      </div>
    </Card>
  );
}