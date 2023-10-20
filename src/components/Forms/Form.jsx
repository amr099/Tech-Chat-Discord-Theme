import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Loading from "src/components/Loading";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`;
const Header = styled.header`
    text-align:center;
    margin-bottom:1rem
`
const H3 = styled.h3`
    color:#fff;
    font-size:25px;
    margin-bottom:10px
`
const P = styled.p`
    color:#B9BBBE;
    font-size:15px
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
`;
const Label = styled.label`
    color:#B9BBBE;
    font-size:12px;
    font-weight:bold;
    margin-bottom:10px;
    text-transform:uppercase;
`;
const Input = styled.input`
    all: unset;
    background-color:#202225;   
    border: 2px solid #202225;
    border-radius: 3px;
    padding: 10px;
    font-size: 1.2rem;
    color:#B9BBBE;
    transitian: all 1s ease-in-out;
`;
const SubmitState = styled.div`
`;
const SubmitButton = styled.button`
    background-color: #5865F2;
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
    text-align: center;
    width: 100%;
    margin: 2rem auto;
    padding: 10px 0;
    &:hover {
        cursor: pointer;
    }
`;

const Action = styled.span`
    font-size: 16px;
    color: #00AFF4;
    &:hover {
        cursor: pointer;
    }
`;
const Span = styled.span`
    font-size: 13px;
    color: #A3A6AA;
`;

export default function Form({ label, state, onSubmit, inputs, showForm }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    return (
        <>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                {label == 'Sign In' ?   <Header>
                    <H3>Welcome back!</H3>
                    <P>We're so excited to see you again!</P>
                </Header> :  <Header>
                    <H3>Create an account</H3>
                </Header>}
                {inputs?.find((i) => i === "email") && (
                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            gotError={errors.email}
                            name='email'
                            type='email'
                            {...register("email", {
                                required: true,
                            })}
                        />
                        {errors.email?.type === "required" && (
                            <span className='error'>
                                {" "}
                                This field is required.
                            </span>
                        )}
                    </InputGroup>
                )}
                {inputs?.find((i) => i === "password") && (
                    <InputGroup>
                        <Label>Password</Label>
                        <Input
                            gotError={errors.password}
                            type='password'
                            {...register("password", {
                                required: true,
                                minLength: "6",
                            })}
                        />
                        {errors.password?.type === "required" && (
                            <span className='error'>
                                {" "}
                                This field is required.
                            </span>
                        )}
                        {errors.password?.type === "minLength" && (
                            <span className='error'>
                                {" "}
                                Password should be 6 characters at least.
                            </span>
                        )}
                    </InputGroup>
                )}
                {inputs?.find((i) => i === "name") && (
                    <>
                        <InputGroup>
                            <Label>Name</Label>
                            <Input
                                gotError={errors.name}
                                type='text'
                                name='name'
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            {errors.name?.type === "required" && (
                                <span className='error'>
                                    {" "}
                                    This field is required.
                                </span>
                            )}
                        </InputGroup>
                    </>
                )}
                {inputs?.find((i) => i === "image") && (
                    <>
                        <InputGroup>
                            <Label>Image</Label>
                            <Input
                                gotError={errors.image}
                                type='file'
                                {...register("image", {
                                    required: true,
                                })}
                            />
                            {errors.image?.type === "required" && (
                                <span className='error'>
                                    {" "}
                                    This field is required.
                                </span>
                            )}
                        </InputGroup>
                    </>
                )}
                <SubmitState>
                    {state.error && (
                        <Label style={{ color: "#fff" }}>{state.error}</Label>
                    )}
                </SubmitState>
                {state.loading ? (
                    <Loading />
                ) : (
                    <SubmitButton type='submit'>{label}</SubmitButton>
                )}
                {label === "Sign In" ? (
                    <p>
                        <Span>Need an account? </Span>{" "}
                        <Action onClick={() => showForm("register")}>
                            Register
                        </Action>
                    </p>
                ) : (
                    <p>
                        <Action onClick={() => showForm("login")}>Already have an account? </Action>{" "}
                    </p>
                )}
            </FormContainer>
        </>
    );
}
