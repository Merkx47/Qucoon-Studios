import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { rooms, getRoomById } from "@/lib/rooms";
import { ArrowLeft, ArrowRight, Check, MapPin, Calendar, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = ["Select Room", "Event Details", "Your Information", "Review & Submit"];

export default function Book() {
  const [step, setStep] = useState(0);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      roomId: "",
      layoutType: "",
      eventDate: "",
      startTime: "",
      endTime: "",
      attendees: 1,
      equipment: [],
      additionalNotes: "",
    },
  });

  const selectedRoom = getRoomById(form.watch("roomId"));

  const mutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted",
        description: "Your reservation request has been received. We will contact you shortly to confirm.",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    mutation.mutate(data);
  };

  const stepFields: Record<number, (keyof InsertBooking)[]> = {
    0: ["roomId"],
    1: ["layoutType", "eventDate", "startTime", "endTime", "attendees"],
    2: ["firstName", "lastName", "email", "phone"],
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!form.watch("roomId");
      case 1:
        return (
          !!form.watch("layoutType") &&
          !!form.watch("eventDate") &&
          !!form.watch("startTime") &&
          !!form.watch("endTime") &&
          form.watch("attendees") > 0
        );
      case 2:
        return (
          !!form.watch("firstName") &&
          !!form.watch("lastName") &&
          !!form.watch("email") &&
          !!form.watch("phone")
        );
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const fields = stepFields[step];
    if (fields) {
      const valid = await form.trigger(fields);
      if (!valid) return;
    }
    setStep((s) => s + 1);
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00",
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-2">
            Reservation
          </p>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
            Reserve Your Space
          </h1>
          <p className="text-muted-foreground mb-10">
            Complete the form below to request a booking at Qucoon Studio.
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1 flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                      i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      i <= step ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 mx-2 ${
                      i < step ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Select Your Room
                </h2>
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 gap-4"
                        >
                          {rooms.map((room) => {
                            const isSelected = field.value === room.id;
                            return (
                              <label
                                key={room.id}
                                data-testid={`card-room-select-${room.id}`}
                                className={`cursor-pointer rounded-md border-2 transition-all ${
                                  isSelected
                                    ? "border-primary bg-primary/5"
                                    : "border-border bg-card"
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row">
                                  <div className="sm:w-48 aspect-video sm:aspect-auto">
                                    <img
                                      src={room.image}
                                      alt={room.name}
                                      className="w-full h-full object-cover rounded-t-md sm:rounded-l-md sm:rounded-tr-none"
                                    />
                                  </div>
                                  <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                      <div>
                                        <h3 className="font-semibold text-base">{room.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {room.subtitle}
                                        </p>
                                      </div>
                                      <RadioGroupItem
                                        value={room.id}
                                        className="shrink-0 mt-0.5"
                                      />
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5" />
                                        Up to {room.capacity} seats
                                      </span>
                                      <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        10th Floor, Churchgate Tower II
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Event Details
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="layoutType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Layout</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-layout">
                              <SelectValue placeholder="Select a layout configuration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedRoom?.layouts.map((layout) => (
                              <SelectItem
                                key={layout}
                                value={layout}
                                data-testid={`option-layout-${layout.toLowerCase()}`}
                              >
                                {layout}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            data-testid="input-event-date"
                            min={new Date().toISOString().split("T")[0]}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-start-time">
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-end-time">
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="attendees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Number of Attendees (Max: {selectedRoom?.capacity || 50})
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            data-testid="input-attendees"
                            min={1}
                            max={selectedRoom?.capacity || 50}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label className="mb-3 block">Equipment & Add-ons</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedRoom?.equipment.map((item) => {
                        const currentEquipment = form.watch("equipment") || [];
                        const isChecked = currentEquipment.includes(item);
                        return (
                          <div
                            key={item}
                            className="flex items-center gap-3 p-3 rounded-md bg-muted/50"
                          >
                            <Checkbox
                              data-testid={`checkbox-equipment-${item.toLowerCase().replace(/\s+/g, "-")}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  form.setValue("equipment", [...currentEquipment, item]);
                                } else {
                                  form.setValue(
                                    "equipment",
                                    currentEquipment.filter((e) => e !== item)
                                  );
                                }
                              }}
                            />
                            <span className="text-sm">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Your Information
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              data-testid="input-first-name"
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              data-testid="input-last-name"
                              placeholder="Enter your last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            data-testid="input-email"
                            placeholder="your@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            data-testid="input-phone"
                            placeholder="+234 xxx xxx xxxx"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-company"
                            placeholder="Your company name"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            data-testid="textarea-notes"
                            placeholder="Any special requirements or requests..."
                            className="resize-none"
                            rows={4}
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Review Your Booking
                </h2>

                <div className="space-y-6">
                  <Card className="p-6 border-border/50">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                      Selected Room
                    </h3>
                    {selectedRoom && (
                      <div className="flex gap-4">
                        <div className="w-24 h-16 rounded-md overflow-hidden shrink-0">
                          <img
                            src={selectedRoom.image}
                            alt={selectedRoom.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{selectedRoom.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {form.watch("layoutType")} layout
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>

                  <Card className="p-6 border-border/50">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                      Event Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground text-xs">Date</p>
                          <p className="font-medium">{form.watch("eventDate")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground text-xs">Time</p>
                          <p className="font-medium">
                            {form.watch("startTime")} - {form.watch("endTime")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground text-xs">Attendees</p>
                          <p className="font-medium">{form.watch("attendees")}</p>
                        </div>
                      </div>
                    </div>
                    {(form.watch("equipment") || []).length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Equipment</p>
                        <div className="flex flex-wrap gap-2">
                          {(form.watch("equipment") || []).map((eq) => (
                            <span
                              key={eq}
                              className="text-xs bg-muted px-2 py-1 rounded-md"
                            >
                              {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>

                  <Card className="p-6 border-border/50">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Name</p>
                        <p className="font-medium">
                          {form.watch("firstName")} {form.watch("lastName")}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Email</p>
                        <p className="font-medium">{form.watch("email")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Phone</p>
                        <p className="font-medium">{form.watch("phone")}</p>
                      </div>
                      {form.watch("company") && (
                        <div>
                          <p className="text-muted-foreground text-xs">Company</p>
                          <p className="font-medium">{form.watch("company")}</p>
                        </div>
                      )}
                    </div>
                    {form.watch("additionalNotes") && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm">{form.watch("additionalNotes")}</p>
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  data-testid="button-back"
                  onClick={() => setStep((s) => s - 1)}
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < steps.length - 1 ? (
                <Button
                  type="button"
                  data-testid="button-next"
                  disabled={!canProceed()}
                  onClick={handleNext}
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  data-testid="button-submit-booking"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Submitting..." : "Submit Reservation"}
                  {!mutation.isPending && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
