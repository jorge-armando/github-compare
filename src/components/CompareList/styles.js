import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(odd) {
        background: #f5f5f5;
      }

      &.actions {
        display: flex;
        justify-content: center;
        button {
          height: 40px;
          padding: 0 10px;
          margin: 0 5px;
          color: #fff;
          border: 0;
          font-size: 16px;
          font-weight: bold;
          border-radius: 3px;

          &:hover {
            cursor: pointer;
          }

          &.updateButton {
            background: #63f5b0;

            &:hover {
              background: #52d89f;
            }
          }

          &.removeButton {
            background: #e23336;

            &:hover {
              background: #b52f32;
            }
          }
        }
      }
    }
  }
`;
