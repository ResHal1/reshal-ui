import React, { useState } from "react";
import styled from "styled-components";

const SubquestionsList = styled.ul`
  padding-bottom: 20px;
`;

const MainQuestion = styled.div`
  cursor: pointer;
  font-size: 1.2em;
`;

interface SubAQItem {
  subquestion: string;
  subanswer: string;
}

interface AQItem {
  question: string;
  answer: string;
  subquestions?: SubAQItem[];
}

const QADocumentation: React.FC = () => {
  const faqData: AQItem[] = [
    {
      question: "Overview",
      answer:
        "The ResHal is a web-based application designed to streamline and simplify the process of reserving football pitches for various events and matches. This comprehensive documentation provides an in-depth overview of the application's features, functionality, and user interface.",
    },
    {
      question: "Get Started",
      answer:
        "Reserve football pitches using web site or if you're an iOS, Android user, you can find us on the App Store or Google Play. Install the app and open a gateway to convenient football hall reservations.",
    },
    {
      question: "What can I do with ResHal",
      answer:
        "To use QADocumentation, import the component and pass an array of FAQ data as props.",
      subquestions: [
        {
          subquestion: "Step 1",
          subanswer:
            "Unlock the full potential of ResHal by creating your personalized account. This will not only streamline your reservation process but also allow you to manage bookings, track your history, and receive exclusive updates and offers.",
        },
        {
          subquestion: "Step 2",
          subanswer:
            "Browse through our extensive list of football halls available for reservation. Use our intuitive search and filtering options to find the perfect venue that matches your preferences, whether it's the location, available time slots, or specific amenities.",
        },
        {
          subquestion: "Step 3",
          subanswer:
            "Found the ideal football hall for your game? Great! Choose your desired date and time with just a few taps. Our real-time availability ensures you secure the spot you want for your match or practice session.",
        },
        {
          subquestion: "Step 4",
          subanswer:
            "Once you've made your selection, proceed to the checkout. Confirm your reservation details and make a secure online payment through our integrated payment gateway. We prioritize the security of your transactions to give you peace of mind.",
        },
        {
          subquestion: "Step 5",
          subanswer:
            "Sit back and relax! Shortly after completing your reservation, you'll receive a confirmation notification with all the details you need. From there, it's just a countdown to your exciting football experience.",
        },
      ],
    },
    {
      question: "ResHal Administrator",
      answer:
        "Welcome to the Administrator's Guide for ResHal, the online reservation system for football pitches. As an administrator, you have the responsibility to manage and oversee various aspects of the application to ensure smooth operation. This guide will provide you with detailed information on the tasks you can perform within ResHal.",
      subquestions: [
        {
          subquestion: "Create Facilities",
          subanswer:
            "Administrators can add new football pitches to the system. This includes specifying details such as location, pitch type, images of the object. To modify facilities you need to click Menu → Administrator → Create Objects",
        },
        {
          subquestion: "Modify Facilities",
          subanswer:
            "Facility details may change over time. You can update information like facility image, type, or any other relevant details go to Menu → Administrator → Objects.",
        },
        {
          subquestion: "Create and delete Facility Types",
          subanswer:
            "ResHal supports different types of football pitches. As an administrator, you can create new facility types, defining the characteristics and specifications associated with each type. To add or delete facility types go to Menu → Administrator → Create Object Types.",
        },
        {
          subquestion: "Check and Delete Reservations",
          subanswer:
            "To ensure the accuracy of reservations, you can perform reservation checks. This involves reviewing upcoming bookings, ensuring there are no conflicts, and addressing any discrepancies. If you want check or delete reservation go to Menu → Administrator → Reservations.",
        },
        {
          subquestion: "Check Users Details",
          subanswer:
            "Stay informed about the users of the system. You can check user details, including contact information, to facilitate communication and support. To check Users information go to Menu → Administrator → Users.",
        },
        {
          subquestion: "Add and remove Ownership",
          subanswer:
            "As an administrator, you can assign ownership of facilities . Owners of the facility are able to modify thir facility data. If you want to add ownership go to Menu → Administrator → Ownership.",
        },
      ],
    },
    {
      question: "ResHal Ownership",
      answer:
        "Welcome to the Ownership Documentation for the Football Pitch Reservation Application. As an owner, you have the ability to manage and modify details related to your facilities. This documentation outlines the features and actions available to you.",
      subquestions: [
        {
          subquestion: "Modify Facilities",
          subanswer:
            "Facility details may change over time. You can update information like pitch dimensions, amenities, or any other relevant details. To modify facilities you need permission added by administrator after that go to Menu → My Facilities ",
        },
      ],
    },
    {
      question: "FAQ",
      answer:
        "Frequently Asked Questions It is a compilation of common questions and their corresponding answers that are anticipated to be asked by users or customers about a particular topic, product, service, or website. ",
      subquestions: [
        {
          subquestion: "Why You can't add new reservation?",
          subanswer:
            "The inability to add a new reservation may be attributed to a couple of reasons. Firstly, it's possible that a reservation for the specified time slot already exists. Please double-check the schedule to ensure there are no conflicting bookings. Secondly, our system has a minimum reservation duration requirement of 30 minutes. If you're attempting to add a reservation for a time period shorter than 30 minutes, the system won't accept the booking. Consider extending the reservation duration to meet this requirement. If the issue persists or if you have any further questions, feel free to reach out to our support team for assistance. We're here to help ensure a smooth reservation process for you.",
        },
        {
          subquestion: "How can I contact with support ?",
          subanswer:
            "To contact our support team, you can reach out to us via email at ResHal@o2.pl. Simply compose a message detailing your query, issue, or any assistance you require, and send it to the provided email address. Our support team will promptly review your message and respond to provide the necessary help or information. Feel free to include as much detail as possible in your email to expedite the resolution process. We appreciate your communication and are here to assist you with any concerns you may have. If you encounter any further difficulties or need urgent assistance, don't hesitate to reach out to us via the provided email address.",
        },
        {
          subquestion: "Why I can't change my Name ?",
          subanswer:
            "If you made a mistake when creating your account and entered the wrong name or surname, please contact support",
        },
      ],
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedSubQuestions, setSelectedSubQuestions] = useState<number[]>(
    []
  );

  const handleQuestionClick = (index: number) => {
    setSelectedQuestion(index === selectedQuestion ? null : index);
    setSelectedSubQuestions([]);
  };

  const handleSubQuestionClick = (subIndex: number) => {
    setSelectedSubQuestions((prevSelected) => {
      if (prevSelected.includes(subIndex)) {
        return prevSelected.filter((item) => item !== subIndex);
      } else {
        return [...prevSelected, subIndex];
      }
    });
  };

  return (
    <div>
      <h1>Documentation</h1>
      <ul>
        {faqData.map((item: AQItem, index: number) => (
          <li key={index}>
            <MainQuestion onClick={() => handleQuestionClick(index)}>
              <strong>{item.question}</strong>
            </MainQuestion>
            {selectedQuestion === index && (
              <>
                <p>{item.answer}</p>
                {item.subquestions && (
                  <SubquestionsList>
                    {item.subquestions.map(
                      (subItem: SubAQItem, subIndex: number) => (
                        <li key={subIndex}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSubQuestionClick(subIndex)}
                          >
                            <strong>{subItem.subquestion}</strong>
                          </div>
                          {selectedSubQuestions.includes(subIndex) && (
                            <p>{subItem.subanswer}</p>
                          )}
                        </li>
                      )
                    )}
                  </SubquestionsList>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <b>
        <p>
          If this documentation was not sufficient, please visit the website
          with{" "}
          <a href="https://tomaszs-organization-3.gitbook.io/reshal-app/usage-ownership">
            Technical Documentation
          </a>
        </p>
      </b>
    </div>
  );
};
export default QADocumentation;
