// chatbot-widget.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.scss'], // Optional: for non-Tailwind styles if needed
})
export class ChatbotWidgetComponent implements AfterViewChecked {
  isOpen = false;
  messages: Message[] = [
    {
      id: '1',
      text: 'Hey! 👋 How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ];
  inputValue = '';
  isLoading = false;

  @ViewChild('messagesEnd') private messagesEnd?: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  async sendMessage(): Promise<void> {
    if (!this.inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: this.inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    this.messages = [...this.messages, userMessage];
    this.inputValue = '';
    this.isLoading = true;

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${userMessage.text}". How else can I assist you?`,
        sender: 'bot',
        timestamp: new Date(),
      };
      this.messages = [...this.messages, botMessage];
      this.isLoading = false;
    }, 800);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  getTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
